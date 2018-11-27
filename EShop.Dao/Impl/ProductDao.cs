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
    public class ProductDao : IProductDao
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
        /// 依照類別編號取得商品
        /// </summary>
        public IList<Product> GetProductsByCategoryId(string categoryId)
        {
            DataTable dt = new DataTable();
            const string sql = @"
                SELECT Id, Name, UnitPrice, Quantity, Status, ClickCount, TraceCount, Type, Description, CategoryId, SellerId, Shipping, CreateDate, ModifyDate
                FROM PRODUCT
                WHERE CategoryId = @CategoryId";
            using (SQLiteConnection conn = new SQLiteConnection(GetDBConnectionString()))
            {
                conn.Open();
                SQLiteCommand cmd = new SQLiteCommand(sql, conn);
                cmd.Parameters.Add(new SQLiteParameter("@CategoryId", categoryId));
                SQLiteDataAdapter dataAdapter = new SQLiteDataAdapter(cmd);
                dataAdapter.Fill(dt);
                conn.Close();
            }
            IList<Product> products = new List<Product>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                products.Add(new Product(dt, i));
            }
            return products;
        }
    }
}
