using EShop.Dao;
using EShop.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Service
{
    public class ProductService : IProductService
    {
        public IProductDao ProductDao = new ProductDao();

        /// <summary>
        /// 依照類別編號取得商品
        /// </summary>
        public IList<Product> GetProductsByCategoryId(string categoryId)
        {
            return ProductDao.GetProductsByCategoryId(categoryId);
        }
    }
}
