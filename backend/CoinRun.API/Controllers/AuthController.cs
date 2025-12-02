using Microsoft.AspNetCore.Mvc;
using CoinRun.API.Data;
using CoinRun.API.DTOs;
using CoinRun.API.Models;
using CoinRun.API.Services;
using BCrypt.Net;

namespace CoinRun.API.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly JwtService _jwt;

        public AuthController(AppDbContext db, JwtService jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            if (_db.Users.Any(u => u.Username == dto.Username))
                return BadRequest("Username already exists");

            var user = new User
            {
                Username = dto.Username,
                CharacterName = dto.CharacterName,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                CreatedAt = DateTime.Now
            };

            _db.Users.Add(user);
            _db.SaveChanges();

            return Ok("User registered");
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _db.Users.FirstOrDefault(u => u.Username == dto.Username);
            if (user == null) return BadRequest("User not found");

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return BadRequest("Wrong password");

            var token = _jwt.Generate(user.Id, user.Username);

            return Ok(new { token });
        }
    }
}
