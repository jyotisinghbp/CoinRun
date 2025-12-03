using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoinRun.API.Data;
using CoinRun.API.DTOs;
using CoinRun.API.Models;
using System.Security.Claims;

namespace CoinRun.API.Controllers
{
    [ApiController]
    [Route("game")]
    public class ScoresController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ScoresController(AppDbContext db)
        {
            _db = db;
        }

        [Authorize]
        [HttpPost("score")]
        public IActionResult SaveScore(ScoreDto dto)
        {
            var userId = int.Parse(User.FindFirst("id").Value);

            var score = new Score
            {
                UserId = userId,
                ScoreValue = dto.ScoreValue,
                TimeTaken = dto.TimeTaken,
                CreatedAt = DateTime.Now
            };

            _db.Scores.Add(score);
            _db.SaveChanges();

            return Ok(new { message = "Score saved" });
        }

        [HttpGet("top")]
        public IActionResult GetTopScores()
        {
            // Group by User to get only the best score per player
            var scores = _db.Scores
                .Include(s => s.User)
                .AsEnumerable() // Perform grouping in memory to ensure correct selection
                .GroupBy(s => s.UserId)
                .Select(g => g.OrderByDescending(s => s.ScoreValue).ThenBy(s => s.TimeTaken).First())
                .OrderByDescending(s => s.ScoreValue)
                .ThenBy(s => s.TimeTaken)
                .Take(3)
                .Select(s => new
                {
                    User = s.User?.Username ?? "Unknown",
                    Character = s.User?.CharacterName ?? "Unknown",
                    s.ScoreValue,
                    s.TimeTaken
                })
                .ToList();

            return Ok(scores);
        }
    }
}
