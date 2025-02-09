// 页面导航控制
function showSection(sectionId) {
    // 隐藏所有内容部分
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('maps-section').classList.add('hidden');
    document.getElementById('timeseries-section').classList.add('hidden');

    // 显示选中的部分
    document.getElementById(`${sectionId}-section`).classList.remove('hidden');
}

// 默认显示首页
showSection('home');

// 全局数据缓存
let cachedData = null;

// 主数据加载和图表生成函数
async function loadDataAndGenerate() {
    console.log('[Debug] 按钮点击事件已触发');
    try {
        // 首次加载数据
        if (!cachedData) {
            console.log('[Debug] 开始加载CSV数据...');
            const response = await fetch('data/cleaned_data.csv');
            if (!response.ok) throw new Error(`HTTP错误! 状态码: ${response.status}`);

            const csvText = await response.text();
            console.log('[Debug] CSV原始数据样本:', csvText.slice(0, 100)); // 显示前100字符

            // 使用PapaParse解析数据
            const parsed = Papa.parse(csvText, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true
            });

            cachedData = parsed.data;
            console.log('[Debug] 解析后的数据样本:', cachedData.slice(0, 3)); // 显示前3行数据
        }

        // 获取用户选择的变量
        const selectedVariable = document.getElementById('variable-select').value;
        console.log(`[Debug] 已选择变量: ${selectedVariable}`);

        // 生成图表
        generateCharts(cachedData, selectedVariable);

    } catch (error) {
        console.error('[Error] 发生错误:', error);
        alert('数据加载失败，请检查控制台日志并刷新页面');
    }
}

// 图表生成核心函数
function generateCharts(data, selectedVariable) {
    console.log('[Debug] 开始生成图表...');
    const container = document.getElementById('charts-container');
    container.innerHTML = ''; // 清空旧图表

    // 步骤1: 获取唯一国家列表
    const countries = [...new Set(data.map(row => ({
        isocode: row.recipient_isocode,
        name: row.recipient_country
    })))];
    console.log('[Debug] 唯一国家列表:', countries);

    // 步骤2: 随机选择6个国家
    const selectedCountries = [];
    while (selectedCountries.length < 6 && countries.length > 0) {
        const randomIndex = Math.floor(Math.random() * countries.length);
        selectedCountries.push(countries.splice(randomIndex, 1)[0]);
    }
    console.log('[Debug] 随机选择的国家:', selectedCountries);

    // 步骤3: 创建图表容器
    const chartDiv = document.createElement('div');
    chartDiv.className = 'chart-box';
    container.appendChild(chartDiv);

    // 步骤4: 生成所有国家的数据轨迹
    const traces = selectedCountries.map(country => {
        // 过滤当前国家数据
        const countryData = data.filter(row =>
            row.recipient_isocode === country.isocode &&
            row.year &&
            row[selectedVariable] !== undefined
        );

        // 过滤无效数据
        const validData = countryData.filter(d =>
            !isNaN(d[selectedVariable]) &&
            d[selectedVariable] !== null
        );

        if (validData.length === 0) {
            console.warn(`[Warning] ${country.isocode} 没有有效数据`);
            return null;
        }

        // 生成随机颜色
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        return {
            x: validData.map(d => d.year),
            y: validData.map(d => d[selectedVariable]),
            mode: 'lines+markers',
            name: `${country.name} (${country.isocode})`,
            line: { color: randomColor }
        };
    }).filter(trace => trace !== null);

    // 步骤5: 图表布局配置
    const layout = {
        title: `${selectedVariable} - Time Series Plot`,
        xaxis: {
            title: 'Year',
            gridcolor: '#f0f0f0',
            showline: true
        },
        yaxis: {
            title: selectedVariable,
            gridcolor: '#f0f0f0',
            showline: true
        },
        hovermode: 'closest',
        showlegend: true,
        legend: {
            x: 1.1,
            y: 0.5,
            bgcolor: 'rgba(255,255,255,0.8)'
        },
        plot_bgcolor: 'rgba(240,240,240,0.5)',
        margin: { l: 80, r: 200, t: 80, b: 80 },
        height: 600
    };

    // 步骤6: 渲染图表
    if (traces.length > 0) {
        Plotly.newPlot(chartDiv, traces, layout);
        console.log('[Debug] 图表渲染完成');
    } else {
        console.warn('[Warning] 没有有效数据可生成图表');
        chartDiv.innerHTML = '<p style="color:red">没有找到有效数据，请尝试其他变量</p>';
    }
}