using EShop.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Dao
{
    public interface IProductDao
    {
        /// <summary>
        /// 依照類別編號取得商品
        /// </summary>
        IList<Product> GetProductsByCategoryId(string categoryId);
    }
}
