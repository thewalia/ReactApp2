using Microsoft.Data.SqlClient;
using ReactApp2.Server.Models;
using System.Data;

namespace ReactApp2.Server.Respository
{
    public class CustomerDataAccess
    {
        private readonly string _connectionString;

        public CustomerDataAccess(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Customer> GetAllClients()
        {
            List<Customer> customers = new List<Customer>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("GetAllClientsWithRiskType", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // ExecuteReader since it's a SELECT operation
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            customers.Add(new Customer
                            {
                                CustomerID = (int)reader["CustomerID"],
                                UserID = (int)reader["UserID"],
                                RiskType = reader["RiskType"].ToString() // New line
                            });
                        }
                    }
                }
            }

            return customers;
        }

        public List<AdvisorPlan> GetAdvisorPlanByCustomer(int customerId)
        {
            List<AdvisorPlan> advisorPlans = new List<AdvisorPlan>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("GetAdvisorPlanByCustomer", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@CustomerId", customerId);

                    // ExecuteReader since it's a SELECT operation
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            advisorPlans.Add(new AdvisorPlan
                            {
                                PortfolioID = (int)reader["PortfolioID"],
                                AdvisorResponse = reader["AdvisorResponse"].ToString(),
                                Approval = (int)reader["Approval"]
                            });
                        }
                    }
                }
            }

            return advisorPlans;
        }

        public void UpdateAdvisorPlanApproval(int customerId, int approval)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("UpdateAdvisorPlanApproval", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@CustomerId", customerId);
                    command.Parameters.AddWithValue("@Approval", approval);

                    // ExecuteNonQuery since it's an UPDATE operation
                    command.ExecuteNonQuery();
                }
            }
        }

        public List<InvestmentDetail> GetInvestmentsByCustomer(int customerId)
        {
            List<InvestmentDetail> investmentDetails = new List<InvestmentDetail>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("GetInvestmentsByCustomer", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@CustomerId", customerId);

                    // ExecuteReader since it's a SELECT operation
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            investmentDetails.Add(new InvestmentDetail
                            {
                                Investment = new Investment
                                {
                                    InvestmentId = (int)reader["InvestmentId"],
                                    PortfolioId = (int)reader["PortfolioId"],
                                    AssetId = (int)reader["AssetId"],
                                    PurchasePrice = (double)reader["PurchasePrice"],
                                    Quantity = (int)reader["Quantity"]
                                },
                                Market = new Market
                                {
                                    AssetId = (int)reader["AssetId"],
                                    AssetType = reader["AssetType"].ToString(),
                                    Name = reader["Name"].ToString(),
                                    CurrentPrice = (double)reader["CurrentPrice"],
                                    Symbol = reader["Symbol"].ToString()
                                }
                            });
                        }
                    }
                }
            }

            return investmentDetails;
        }


        public void RegisterClient(User client)
        {

            // Validate password length and complexity


            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("InsertCustomer", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters


                    command.Parameters.AddWithValue("@FirstName", client.FirstName);
                    command.Parameters.AddWithValue("@LastName", client.LastName);
                    command.Parameters.AddWithValue("@Email", client.Email);
                    command.Parameters.AddWithValue("@Password", client.Password);
                    command.Parameters.AddWithValue("@UserType", client.UserType);

                    // ExecuteNonQuery since it's an INSERT operation
                    command.ExecuteNonQuery();
                }
            }
        }

        public Customer ValidateClient(User client)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("ValidateClient", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@Email", client.Email);
                    command.Parameters.AddWithValue("@Password", client.Password);

                    // ExecuteReader since it's a SELECT operation
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Customer
                            {
                                CustomerID = (int)reader["CustomerID"],
                                UserID = (int)reader["UserID"]
                            };
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }

        public Customer GetClientByEmail(string email)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("GetClientByEmail", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@Email", email);

                    // ExecuteReader since it's a SELECT operation
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Customer
                            {
                                CustomerID = (int)reader["CustomerID"],
                                UserID = (int)reader["UserID"]
                            };
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }

        public void UpdateRiskType(int customerId, RiskResultModel RiskType)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("UpdateRiskType", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@CustomerId", customerId);
                    command.Parameters.AddWithValue("@RiskType", RiskType.riskResult);

                    // ExecuteNonQuery since it's an UPDATE operation
                    command.ExecuteNonQuery();
                }
            }
        }


        public void DeleteCustomer(int customerId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("DeleteCustomer", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@CustomerId", customerId);

                    // ExecuteNonQuery since it's a DELETE operation
                    command.ExecuteNonQuery();
                }
            }
        }

        public User GetClientInfo(int customerId)
        {
            User user = null;

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("GetClientInfo", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@CustomerId", customerId);

                    // ExecuteReader since it's a SELECT operation
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            user = new User
                            {
                                UserID = (int)reader["UserID"],
                                FirstName = reader["FirstName"].ToString(),
                                LastName = reader["LastName"].ToString(),
                                Email = reader["Email"].ToString()
                                // Password and UserType are not included
                            };
                        }
                    }
                }
            }

            return user;
        }


        public List<Portfolio> GetCustomersByCustomerID(int customerId)
        {
            var portfolios = new List<Portfolio>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("GetCustomersByCustomerID", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@CustomerId", customerId);

                    // ExecuteReader since it's a SELECT operation
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            portfolios.Add(new Portfolio
                            {
                                CustomerID = (int)reader["CustomerID"],
                                AdvisorID = (int)reader["AdvisorID"],
                                PortfolioName = reader["PortfolioName"].ToString(),
                                RiskType = reader["RiskType"].ToString(),
                                CurrentValue = (double)reader["CurrentValue"],
                                TotalInvestedValue = (double)reader["TotalInvestedValue"]
                            });
                        }
                    }
                }
            }

            return portfolios;
        }

    }
}
