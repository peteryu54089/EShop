using EShop.Dao;
using EShop.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Service
{
    public class ProductCategoryService : IProductCategoryService
    {
        public IProductCategoryDao ProductCategoryDao = new ProductCategoryDao();

        /// <summary>
        /// 取得所有商品類別
        /// </summary>
        public IList<ProductCategory> GetAllCategories()
        {
            return ProductCategoryDao.GetAllCategories();
        }
    }
}
