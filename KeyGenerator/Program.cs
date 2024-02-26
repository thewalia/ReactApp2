using System.Security.Cryptography;

namespace KeyGenerator
{
    internal class Program
    {
        static void Main(string[] args)
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                var key = new byte[32]; // 256 bits
                rng.GetBytes(key);
                var base64Key = Convert.ToBase64String(key);
                Console.WriteLine(base64Key);
            }
        }
    }
}
