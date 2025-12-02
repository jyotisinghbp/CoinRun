namespace CoinRun.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = "";
        public string PasswordHash { get; set; } = "";
        public string? CharacterName { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
