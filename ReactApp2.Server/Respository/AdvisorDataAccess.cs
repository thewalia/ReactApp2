using Microsoft.Data.SqlClient;
using ReactApp2.Server.Models;
using System.Data;

namespace ReactApp2.Server.Respository
{
    public class AdvisorDataAccess
    {
        private readonly string _connectionString;

        public AdvisorDataAccess(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void RegisterAdvisor(User advisor)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("InsertAdvisor", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@FirstName", advisor.FirstName);
                    command.Parameters.AddWithValue("@LastName", advisor.LastName);
                    command.Parameters.AddWithValue("@Email", advisor.Email);
                    command.Parameters.AddWithValue("@Password", advisor.Password);
                    command.Parameters.AddWithValue("@UserType", "advisor");
                   

                    // ExecuteNonQuery since it's an INSERT operation
                    command.ExecuteNonQuery();

                }
            }
        }

        public Advisor ValidateAdvisor(User advisor)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("ValidateAdvisor", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@Email", advisor.Email);
                    command.Parameters.AddWithValue("@Password", advisor.Password);

                    // ExecuteReader since it's a SELECT operation
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Advisor
                            {
                                AdvisorID = (int)reader["AdvisorID"],
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
        public Advisor GetAdvisorByEmail(string email)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("GetAdvisorByEmail", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@Email", email);

                    // ExecuteReader since it's a SELECT operation
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Advisor
                            {
                                AdvisorID = (int)reader["AdvisorID"],
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

        public void InsertAdvisorExp(int advisorId, string qualifications, int experienceYears)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("InsertAdvisorExp", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@AdvisorId", advisorId);
                    command.Parameters.AddWithValue("@Qualifications", qualifications);
                    command.Parameters.AddWithValue("@ExperienceYears", experienceYears);

                    // ExecuteNonQuery since it's an INSERT operation
                    command.ExecuteNonQuery();
                }
            }
        }

        public void AssignAdvisorToCustomer(int advisorId, int customerId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("AssignAdvisorToCustomer", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@AdvisorId", advisorId);
                    command.Parameters.AddWithValue("@CustomerId", customerId);

                    // ExecuteNonQuery since it's an UPDATE operation
                    command.ExecuteNonQuery();
                }
            }
        }

        public List<Portfolio> GetCustomersByAdvisor(int advisorId)
        {
            var portfolios = new List<Portfolio>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("GetCustomersByAdvisor", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@AdvisorId", advisorId);

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
                                CurrentValue = (int)reader["CurrentValue"],
                                //TotalInvestedValue = (int)reader["TotalInvestedValue"]
                            });
                        }
                    }
                }
            }

            return portfolios;
        }

        public void UpdateAdvisorPlan(int customerId, AdvisorPlan plan)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("UpdateAdvisorPlan", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@CustomerId", customerId);
                    command.Parameters.AddWithValue("@AdvisorResponse", plan.AdvisorResponse);

                    // ExecuteNonQuery since it's an UPDATE operation
                    command.ExecuteNonQuery();
                }
            }
        }

        public List<Market> GetAvailableAssets()
        {
            List<Market> assets = new List<Market>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("GetAvailableAssets", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // ExecuteReader since it's a SELECT operation
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            assets.Add(new Market
                            {
                                AssetId = (int)reader["AssetId"],
                                AssetType = reader["AssetType"].ToString(),
                                Name = reader["Name"].ToString(),
                                CurrentPrice = (int)reader["CurrentPrice"]
                            });
                        }
                    }
                }
            }

            return assets;
        }

        public void AddInvestments(int advisorId, List<int> assetIds)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                foreach (int assetId in assetIds)
                {
                    using (SqlCommand command = new SqlCommand("AddInvestment", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        // Parameters
                        command.Parameters.AddWithValue("@AdvisorId", advisorId);
                        command.Parameters.AddWithValue("@AssetId", assetId);

                        // ExecuteNonQuery since it's an INSERT operation
                        command.ExecuteNonQuery();
                    }
                }
            }
        }

        public void SellInvestments(int advisorId, List<int> assetIds)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                foreach (int assetId in assetIds)
                {
                    using (SqlCommand command = new SqlCommand("SellInvestment", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        // Parameters
                        command.Parameters.AddWithValue("@AdvisorId", advisorId);
                        command.Parameters.AddWithValue("@AssetId", assetId);

                        // ExecuteNonQuery since it's an UPDATE operation
                        command.ExecuteNonQuery();
                    }
                }
            }
        }

        public List<InvestmentDetail> GetClientInvestments(int advisorId)
        {
            List<InvestmentDetail> investmentDetails = new List<InvestmentDetail>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("GetClientInvestments", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@AdvisorId", advisorId);

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
                                    PurchasePrice = (int)reader["PurchasePrice"],
                                    Quantity = (int)reader["Quantity"]
                                },
                                Market = new Market
                                {
                                    AssetId = (int)reader["AssetId"],
                                    AssetType = reader["AssetType"].ToString(),
                                    Name = reader["Name"].ToString(),
                                    CurrentPrice = (int)reader["CurrentPrice"]
                                }
                            });
                        }
                    }
                }
            }

            return investmentDetails;
        }



        public void DeleteAdvisor(int advisorId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("DeleteAdvisor", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@AdvisorId", advisorId);

                    // ExecuteNonQuery since it's a DELETE operation
                    command.ExecuteNonQuery();
                }
            }
        }


    }
}
