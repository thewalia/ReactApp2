##################################################
#   Code developed By Anshumaan Tiwari           #
#              Copyright                         #
##################################################


import pyodbc
from dotenv import load_dotenv
load_dotenv() ## load all the environemnt variables

import streamlit as st
import os
import sqlite3

import google.generativeai as genai
## Configure Genai Key

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

## Function To Load Google Gemini Model and provide queries as response
prompt=[
    """
    
    You are an expert in converting English questions to SQL queries!
    The SQL database has the following tables:

    - USERS: UserID, FirstName, LastName, Email, Password, UserType
    - CUSTOMER: CustomerID, UserID
    - PORTFOLIO: PortfolioID, CustomerID, AdvisorID, PortfolioName, RiskType, CurrentValue, TotalInvestedValue
    - ADVISORPLAN: PortfolioID, AdvisorResponse, Approval
    - INVESTMENT: InvestmentId, PortfolioId, AssetId, PurchasePrice, Quantity
    - MARKET: AssetId, AssetType, Symbol, Name, CurrentPrice
    - ADVISOREXP: AdvisorID, ExperienceYears, Qualifications
    
    For example,
    Example 1 - How many customers are there?, the SQL command will be something like this SELECT COUNT(*) FROM CUSTOMER;
    Example 2 - What are the investments in a specific portfolio?, the SQL command will be something like this SELECT * FROM INVESTMENT where PortfolioId=1;
    Example 3 - What's the current price of a specific asset?, the SQL command will be something like this SELECT CurrentPrice FROM MARKET where AssetId=1;
    Example 4 - What are the qualifications of a specific advisor?, the SQL command will be something like this SELECT Qualifications FROM ADVISOREXP where AdvisorID=1;
    also the sql code should not have ``` in beginning or end and sql word in output

    """
]

## Function to get Gemini response based on intent
def get_gemini_response(question):
    xg1=0
    response = ""
    if is_sql_query(question):
        chat_session = sql_chat_session
        xg1=0
    else:
        chat_session = general_chat_session
        xg1=1

    if xg1 == 0:
        response = chat_session.send_message([prompt[0],question])
    else:
        response = chat_session.send_message(question)
    return response.text


## Function to determine if the question is a SQL query
def is_sql_query(question):
    sql_keywords = ["how many", "list", "select", "where", "from"]
    return any(word in question.lower() for word in sql_keywords)

## Start chat sessions for SQL and general conversation
sql_chat_session = genai.GenerativeModel("gemini-pro").start_chat(
    history=[]
)
general_chat_session = genai.GenerativeModel("gemini-pro").start_chat(
    history=[]
)

## Fucntion To retrieve query from the database

def read_sql_query(sql,db_config):
    conn_str = (
        r"DRIVER={ODBC Driver 17 for SQL Server};"  # Adjust driver name if needed
        r"SERVER=" + db_config["server"] + ";"
        r"DATABASE=" + db_config["database"] + ";"
        r"UID=" + db_config["username"] + ";"
        r"PWD=" + db_config["password"] + ";"
    )

    conn = pyodbc.connect(conn_str)
    cur = conn.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    conn.commit()
    conn.close()
    return rows  

## Define Your Prompt


db_config = {
    "server": "G1-JMML114-L\\SQLEXPRESS",
    "database": "ReactApp2Db",
    "username": "sa",
    "password": "rajnagar1@R"
}

st.set_page_config(page_title="I can Retrieve Any SQL query")
st.header("Gemini App To Retrieve SQL Data")

question = st.text_input("Input: ", key="input")
submit = st.button("Ask the question")

if submit:
    response = get_gemini_response(question)

    if is_sql_query(question):  # If it's an SQL query 
        results = read_sql_query(response, db_config)
        st.subheader("The Response is")  
        for row in results:
            st.write(row)  # Display results neatly
    else:  # General response
        st.subheader("Response:")
        st.write(response)      