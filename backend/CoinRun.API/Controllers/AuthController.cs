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
            Console.WriteLine($"[Register] Attempting to register user: '{dto.Username}'");

            if (string.IsNullOrWhiteSpace(dto.Username))
                return BadRequest("Username cannot be empty");

            if (string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest("Password cannot be empty");

            // Check if user exists (case-insensitive check is safer)
            var existingUser = _db.Users.FirstOrDefault(u => u.Username == dto.Username);
            if (existingUser != null)
            {
                Console.WriteLine($"[Register] Username '{dto.Username}' already exists. ID: {existingUser.Id}");
                return BadRequest($"Username '{dto.Username}' already exists");
            }

            var user = new User
            {
                Username = dto.Username,
                CharacterName = dto.CharacterName,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                CreatedAt = DateTime.Now
            };

            _db.Users.Add(user);
            _db.SaveChanges();

            return Ok(new { message = "User registered successfully" });
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
