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
    public class ProductCategoryDao : IProductCategoryDao
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
        /// 取得所有商品類別
        /// </summary>
        public IList<ProductCategory> GetAllCategories()
        {
            DataTable dt = new DataTable();
            const string sql = @"
                SELECT Id, CategoryId, Name
                FROM PRODUCT_CATEGORY";
            using (SQLiteConnection conn = new SQLiteConnection(GetDBConnectionString()))
            {
                conn.Open();
                SQLiteCommand cmd = new SQLiteCommand(sql, conn);
                SQLiteDataAdapter dataAdapter = new SQLiteDataAdapter(cmd);
                dataAdapter.Fill(dt);
                conn.Close();
            }
            IList<ProductCategory> categories = new List<ProductCategory>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                categories.Add(new ProductCategory(dt, i));
            }
            return categories;
        }
    }
}
