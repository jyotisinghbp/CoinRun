namespace CoinRun.API.Models
{
    public class Score
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public int ScoreValue { get; set; }
        public int TimeTaken { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
