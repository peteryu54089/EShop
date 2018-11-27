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
    public class ProductModel
    {
        public IProductService productService = new ProductService();

        /// <summary>
        /// 商品ID
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// 商品名稱
        /// </summary>
        [MaxLength(60)]
        [DisplayName("商品名稱")]
        [Required(ErrorMessage = "此欄位必填")]
        public string Name { get; set; }

        /// <summary>
        /// 商品單價
        /// </summary>
        [MaxLength(10)]
        [DisplayName("商品單價")]
        [Required(ErrorMessage = "此欄位必填")]
        public int UnitPrice { get; set; }

        /// <summary>
        /// 商品數量
        /// </summary>
        [MaxLength(10)]
        [DisplayName("商品數量")]
        [Required(ErrorMessage = "此欄位必填")]
        public int Quantity { get; set; }

        /// <summary>
        /// 商品狀態
        /// </summary>
        [DisplayName("商品狀態")]
        public int Status { get; set; }

        /// <summary>
        /// 商品點擊次數
        /// </summary>
        [DisplayName("商品點擊次數")]
        public int ClickCount { get; set; }

        /// <summary>
        /// 商品追蹤次數
        /// </summary>
        [DisplayName("商品追蹤次數")]
        public int TraceCount { get; set; }

        /// <summary>
        /// 商品新舊
        /// </summary>
        [DisplayName("商品新舊")]
        [Required(ErrorMessage = "此欄位必填")]
        public int Type { get; set; }

        /// <summary>
        /// 商品描述
        /// </summary>
        [MaxLength(2000)]
        [DisplayName("商品描述")]
        [Required(ErrorMessage = "此欄位必填")]
        public string Description { get; set; }

        /// <summary>
        /// 商品類別
        /// </summary>
        [DisplayName("商品類別")]
        [Required(ErrorMessage = "此欄位必填")]
        public string CategoryId { get; set; }

        /// <summary>
        /// 賣家編號
        /// </summary>
        public string SellerId { get; set; }

        /// <summary>
        /// 商品運費
        /// </summary>
        [MaxLength(10)]
        [DisplayName("商品運費")]
        [Required(ErrorMessage = "此欄位必填")]
        public int Shipping { get; set; }

        /// <summary>
        /// 創建日期
        /// </summary>
        [DisplayName("創建日期")]
        public DateTime? CreateDate { get; set; }

        /// <summary>
        /// 修改日期
        /// </summary>
        [DisplayName("修改日期")]
        public DateTime? ModifyDate { get; set; }

        public ProductModel()
        {

        }

        public ProductModel(IProduct product)
        {
            Id = product.Id;
            Name = product.Name;
            UnitPrice = product.UnitPrice;
            Quantity = product.Quantity;
            Status = product.Status;
            ClickCount = product.ClickCount;
            TraceCount = product.TraceCount;
            Type = product.Type;
            Description = product.Description;
            CategoryId = product.CategoryId;
            SellerId = product.SellerId;
            Shipping = product.Shipping;
            CreateDate = product.CreateDate;
            ModifyDate = product.ModifyDate;
        }

        /// <summary>
        /// 依照類別編號取得商品
        /// </summary>
        public IList<ProductModel> GetProductsByCategoryId(string categoryId)
        {
            IList<Product> products = productService.GetProductsByCategoryId(categoryId);
            IList<ProductModel> productModels = new List<ProductModel>();
            foreach (Product product in products)
            {
                productModels.Add(new ProductModel(product));
            }
            return productModels;
        }
    }
}
