using Microsoft.Data.SqlClient;
using ReactApp2.Server.Models;
using System.Data;

namespace ReactApp2.Server.Respository
{
    public class ClientDataAccess
    {
        private readonly string _connectionString;

        public ClientDataAccess(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void RegisterClient(Client client)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("RegisterClient", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@Username", client.Username);
                    command.Parameters.AddWithValue("@Password", client.Password);

                    // ExecuteNonQuery since it's an INSERT operation
                    command.ExecuteNonQuery();
                }
            }
        }

        public Client ValidateClient(Client client)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("ValidateClient", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parameters
                    command.Parameters.AddWithValue("@Username", client.Username);
                    command.Parameters.AddWithValue("@Password", client.Password);

                    // ExecuteReader since it's a SELECT operation
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Client
                            {
                                ClientId = (int)reader["Id"],
                                Username = (string)reader["Username"],
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
