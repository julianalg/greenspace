import numpy as np
import pandas as pd
from scipy.stats import pearsonr
import matplotlib.pyplot as plt
from numpy.polynomial.polynomial import polyfit
from sklearn.metrics import mean_absolute_error as mae
import warnings
warnings.filterwarnings('ignore')

# Load the data from the CSV files
parks_df = pd.read_csv('Parks_in_San_Diego.csv')  # Replace 'parks.csv' with the actual filename
sizes_df = pd.read_csv('parks_datasd.csv')  # Replace 'park_sizes.csv' with the actual filename

# Merge the DataFrames based on the 'name' column
merged_df = pd.merge(parks_df, sizes_df, on='name', how='left')
merged_df.dropna(subset=['gis_acres'], inplace=True)
merged_df.dropna(how='all', axis=1, inplace=True)
merged_df.drop_duplicates(subset=['Latitude', 'Longitude'], inplace=True)


# Save the merged DataFrame to a new CSV file
merged_df.to_csv('combined_parks.csv', index=False)  # Replace 'combined_parks.csv' with the desired filename

