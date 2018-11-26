using EShop.Model;
using EShop.Service;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EShop.Models
{
    public class ProductCategoryModel
    {
        public IProductCategoryService productCategoryService = new ProductCategoryService();

        /// <summary>
        /// 商品類別ID
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// 繼承商品類別ID
        /// </summary>
        public string CategoryId { get; set; }

        /// <summary>
        /// 商品類別名稱
        /// </summary>
        [MaxLength(60)]
        [DisplayName("商品類別名稱")]
        [Required(ErrorMessage = "此欄位必填")]
        public string Name { get; set; }

        public ProductCategoryModel()
        {

        }

        public ProductCategoryModel(IProductCategory category)
        {
            Id = category.Id;
            CategoryId = category.CategoryId;
            Name = category.Name;
        }

        /// <summary>
        /// 取得所有商品類別
        /// </summary>
        public IList<ProductCategoryModel> GetAllCategories()
        {
            IList<ProductCategory> categories = productCategoryService.GetAllCategories();
            IList<ProductCategoryModel> categoryModels = new List<ProductCategoryModel>();
            foreach (ProductCategory category in categories)
            {
                categoryModels.Add(new ProductCategoryModel(category));
            }
            return categoryModels;
        }
    }
}
