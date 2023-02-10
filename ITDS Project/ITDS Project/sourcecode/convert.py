
import pandas
import xlsxwriter
pandas.read_json("data.json").to_excel("data.xlsx",engine="xlsxwriter")
