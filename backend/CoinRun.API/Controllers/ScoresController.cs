using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

            return Ok("Score saved");
        }

        [HttpGet("top")]
        public IActionResult GetTopScores()
        {
            var scores = _db.Scores
                .OrderByDescending(s => s.ScoreValue)
                .ThenBy(s => s.TimeTaken)
                .Take(3)
                .Select(s => new
                {
                    User = s.User.Username,
                    Character = s.User.CharacterName,
                    s.ScoreValue,
                    s.TimeTaken
                })
                .ToList();

            return Ok(scores);
        }
    }
}
