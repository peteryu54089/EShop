using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EShop.Common;
using EShop.Model;

namespace EShop.Dao
{
    public class MemberDao : IMemberDao
    {
        /// <summary>
		/// 取得DB連線字串
		/// </summary>
		/// <returns></returns>
		public string GetDBConnectionString()
        {
            return ConfigTool.GetDBConnectionString("DBConn");
        }

        /// <summary>
        /// 依照帳號密碼取得會員
        /// </summary>
        public Member GetMemberByAccountAndPassword(string account, string password)
        {
            DataTable dt = new DataTable();
            const string sql = @"
                SELECT Id, Name, Account, Password, Email, Phone, Address, Sex, Birthday, Privilege, CreateDate, ModifyDate
                FROM MEMBER
                WHERE Account = @Account AND Password = @Password";
            using (SQLiteConnection conn = new SQLiteConnection(GetDBConnectionString()))
            {
                conn.Open();
                SQLiteCommand cmd = new SQLiteCommand(sql, conn);
                cmd.Parameters.Add(new SQLiteParameter("@Account", account));
                cmd.Parameters.Add(new SQLiteParameter("@Password", password));
                SQLiteDataAdapter dataAdapter = new SQLiteDataAdapter(cmd);
                dataAdapter.Fill(dt);
                conn.Close();
            }
            return new Member(dt);
        }
    }
}
