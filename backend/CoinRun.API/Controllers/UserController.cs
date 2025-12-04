using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CoinRun.API.Data;
using System.Linq;
using System.Security.Claims;

namespace CoinRun.API.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _db;

        public UserController(AppDbContext db)
        {
            _db = db;
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var userId = int.Parse(User.FindFirst("id").Value);
            var user = _db.Users.First(u => u.Id == userId);

            return Ok(new
            {
                user.Username,
                user.CharacterName
            });
        }

        [Authorize]
        [HttpPut("character")]
        public IActionResult UpdateCharacter([FromBody] System.Text.Json.JsonElement body)
        {
            int userId = int.Parse(User.FindFirst("id").Value);
            string character = body.GetProperty("characterName").GetString();

            var user = _db.Users.First(u => u.Id == userId);
            user.CharacterName = character;
            _db.SaveChanges();

            return Ok(new { message = "Character updated" });
        }
    }
}
