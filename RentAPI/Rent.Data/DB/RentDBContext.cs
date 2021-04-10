using Microsoft.EntityFrameworkCore;
using Rent.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rent.Data.DB
{

    public class RentDBContext : DbContext
    {
        public RentDBContext(DbContextOptions<RentDBContext> options)
            : base(options)
        {
        }

        public DbSet<Users> users { get; set; }
        public DbSet<Area> area { get; set; }
        public DbSet<Item> item { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.Id);
                entity.Property(e => e.Name);
                entity.Property(e => e.Email);
                entity.Property(e => e.Phone);
                entity.Property(e => e.Password);
                entity.Property(e => e.IsActive);
                entity.Property(e => e.CreatedOn);
            });
         


            modelBuilder.Entity<Area>(entity =>
            {
                entity.Property(e => e.Id);
                entity.Property(e => e.Name);
                entity.Property(e => e.IsActive);
                entity.Property(e => e.CreatedOn);
            });

            modelBuilder.Entity<Item>(entity =>
            {
                entity.Property(e => e.Id);
                entity.Property(e => e.AreaId);
                entity.Property(e => e.ArticleName);
                entity.Property(e => e.Quantity);
                entity.Property(e => e.ApprovalNo);
                entity.Property(e => e.Date);
                entity.Property(e => e.CpNo);
                entity.Property(e => e.SpNo);
                entity.Property(e => e.Remarks);

                entity.Property(e => e.IsActive);
                entity.Property(e => e.CreatedOn);
            });
        }
    }

}
