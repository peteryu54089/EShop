using EShop.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Dao
{
    public interface IProductCategoryDao
    {
        /// <summary>
        /// 取得所有商品類別
        /// </summary>
        IList<ProductCategory> GetAllCategories();
    }
}
