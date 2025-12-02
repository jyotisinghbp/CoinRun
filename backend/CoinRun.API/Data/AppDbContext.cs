using Microsoft.EntityFrameworkCore;
using CoinRun.API.Models;

namespace CoinRun.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Score> Scores { get; set; }
    }
}
