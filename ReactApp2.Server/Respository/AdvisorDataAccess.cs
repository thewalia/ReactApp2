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

        public void RegisterAdvisor(Advisor advisor)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("Insertadvisor", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters

                    command.Parameters.AddWithValue("@FirstName", advisor.FirstName);
                    command.Parameters.AddWithValue("@LastName", advisor.LastName);
                    command.Parameters.AddWithValue("@Email", advisor.Email);
                    command.Parameters.AddWithValue("@Password", advisor.Password);

                    // ExecuteNonQuery since it's an INSERT operation
                    command.ExecuteNonQuery();
                }
            }
        }

        public Advisor ValidateAdvisor(Advisor advisor)
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
                                FirstName = (string)reader["FirstName"],
                                LastName = (string)reader["LastName"],
                                Email = (string)reader["Email"],
                                Password = (string)reader["Password"]
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

                using (SqlCommand command = new SqlCommand("ValidateAdvisor", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@Email", email);
                    command.Parameters.AddWithValue("@Password", "333");

                    // ExecuteReader since it's a SELECT operation
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Advisor
                            {
                                AdvisorID = (int)reader["AdvisorId"],
                                Email = (string)reader["Email"],
                                Password = (string)reader["Password"]
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

    }
}
