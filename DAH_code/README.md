# Code Repository for:  
**"Allocation and Drivers of Development Assistance for Health from the United States, 2000–2020"**  
*Submitted to The Lancet Global Health*

## 📘 Overview

This repository contains the core analysis code and supporting materials for the article entitled:  
**"Allocation and Drivers of Development Assistance for Health from the United States, 2000–2020"**

The study investigates how U.S. development assistance for health (DAH) was influenced by recipient need, donor interest, and recipient merit, using panel data from 2000 to 2020.  

The methods include:
- **Two-stage data imputation** using **Random Forest + Spatiotemporal Gaussian Process Regression (ST-GPR)** in Python
- **Mixed effects regression analysis** using Stata

---

## 📂 Repository Structure

---

## 💻 How to Use

1. **Data imputation in Python**  
   Navigate to the `python_code/` folder and run `data_imputation_rf_stgpr.py`. This script performs two-stage imputation and generates cleaned variables for use in regression.

2. **Regression analysis in Stata**  
   Open the `regression_models.do` file in Stata. It runs the mixed effects model and fixed effects model, and outputs regression tables used in the manuscript (Table 1 and 2, Supplementary Tables S5–S6).

3. **Dataset**  
   The cleaned and imputed dataset is located at:

---

## 📑 Notes

- All source data were obtained from publicly available repositories (IHME, World Bank, WHO, UN Voting Database).
- Variables included in the final dataset cover DAH, DALYs, GDP, health workforce, diplomatic distance, trade level, governance metrics, etc.
- Imputation was only applied to variables with missingness, using a conservative approach that preserves original values when available.

---

## 📬 Contact

For questions or feedback, please contact:  
**Yan Hao** – [yjh5219@outlook.com](mailto:yjh5219@outlook.com)

---

## 📄 License

This code is released under the MIT License.  
Please cite the associated article when using any part of this repository.


