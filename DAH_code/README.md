# Code Repository for:  
**"Allocation and Drivers of Development Assistance for Health from the United States, 2000–2020"**  
*Submitted to The Lancet Global Health*

## 📘 Overview

This repository contains the core code and documentation supporting the article titled:  
**"Allocation and Drivers of Development Assistance for Health from the United States, 2000–2020"**

The study investigates the key factors shaping the allocation of U.S. development assistance for health (DAH) between 2000 and 2020, using original data from IHME, World Bank, WHO, and other public sources.  

Analytical steps include:
- **Two-stage data imputation** using a combination of Random Forest and Spatiotemporal Gaussian Process Regression (ST-GPR)
- **Mixed effects and fixed effects regression modeling** on panel data

---

## 📂 Repository Structure


---

## 💻 How to Use

1. **Imputation code**  
   The file `RF+stgpr_data_imputation_python.txt` contains the Python code used to implement a two-stage imputation strategy, filling in missing values for health workforce and infrastructure variables.

2. **Regression code**  
   The file `stata_regression_code.txt` contains Stata code for estimating both fixed effects and mixed effects models, as used in the main analysis and supplementary robustness checks.

3. **Dataset**  
   The cleaned and imputed dataset used in the study is saved as: US_DAH_merged_file.csv

   
---

## 📝 Notes

- Data used in this study were publicly available and obtained from international organizations including IHME, World Bank, WHO, and the United Nations.
- All code is documented in `.txt` format for clarity and reproducibility.
- Imputation was only performed where missingness exceeded acceptable thresholds and was based on observed covariates with strong predictive performance.

---

## 📬 Contact

For questions or collaboration, please contact:  
**Yan Hao** – [yanhao_ii@hsc.pku.edu.cn](mailto:yanhao_ii@hsc.pku.edu.cn)

---

## 📄 License

This repository is distributed under the MIT License.  
Please cite the article if you make use of this code or dataset.


