using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Security;
using Dapper;
using Dapper.Contrib.Extensions;

namespace backend_dice_counter.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DiceItemController : ControllerBase
    {
        private readonly IConfiguration _config;

        public DiceItemController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        public List<DiceItem> GetItems()
        {
            using(var conn = getDbConnection())
            {
                var sql = @"
                    SELECT *
                    FROM dice";
                var param = new {};

                var dice = conn.Query<DiceItem>(sql, param).ToList();
                return dice;
            }
        }

        private SqlConnection getDbConnection(){
            var conn = new SqlConnection(_config.GetValue<string>("ConnectionStrings:SQL"));

            var u = _config.GetValue<string>("ConnectionStrings:Username");
            SecureString p = new SecureString();
            foreach(var c in _config.GetValue<string>("ConnectionStrings:Password").ToCharArray())
            {
                p.AppendChar(c);
            }
            p.MakeReadOnly();

            var cred = new SqlCredential(u, p);

            conn.Credential = cred;
            conn.Open();

            return conn;
        }
    }
}