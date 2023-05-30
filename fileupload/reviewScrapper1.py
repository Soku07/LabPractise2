import pandas as pd
import requests
from bs4 import BeautifulSoup

Product_Name = []
Prices = []
Description = []
Review = []
# for i in range(2,10):
url = "https://www.flipkart.com/search?q=mobiles+phones+under+50000&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off&page=1"

r = requests.get(url)
soup = BeautifulSoup(r.text, "lxml")

names = soup.find_all("div", class_ = "_4rR01T")
prices = soup.find_all("div", class_="_30jeq3 _1_WHN1")
# print(names)

for i in names:
    name = i.text
    Product_Name.append(name)
    # Prices.append()
print(len(Product_Name))

for i in prices:
    price = i.text
    Prices.append(price)
print(Prices)

df = pd.DataFrame({"Product_Name":Product_Name, "Prices":Prices})
print(df)
df.to_csv("Flipkart_mobiles_under_50000")





    # np = soup.find("a", class_ = "_1LKTO3").get("href")
    # cnp = "https://www.flipkart.com" + np
    # print(cnp)

