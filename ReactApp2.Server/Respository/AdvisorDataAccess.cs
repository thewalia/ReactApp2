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
