using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Model
{
    public class Product : IProduct
    {
        public virtual string Id { get; set; }

        public virtual string Name { get; set; }

        public virtual int UnitPrice { get; set; }

        public virtual int Quantity { get; set; }

        public virtual int Status { get; set; }

        public virtual int ClickCount { get; set; }

        public virtual int TraceCount { get; set; }

        public virtual int Type { get; set; }

        public virtual string Description { get; set; }

        public virtual string CategoryId { get; set; }

        public virtual string SellerId { get; set; }

        public virtual int Shipping { get; set; }

        public virtual DateTime CreateDate { get; set; }

        public virtual DateTime ModifyDate { get; set; }

        public Product(DataTable productCategoryData, int index)
        {
            Id = productCategoryData.Rows[index]["Id"].ToString();
            Name = productCategoryData.Rows[index]["Name"].ToString();
            UnitPrice = Convert.ToInt32(productCategoryData.Rows[index]["UnitPrice"]);
            Quantity = Convert.ToInt32(productCategoryData.Rows[index]["Quantity"]);
            Status = Convert.ToInt32(productCategoryData.Rows[index]["Status"]);
            ClickCount = Convert.ToInt32(productCategoryData.Rows[index]["ClickCount"]);
            TraceCount = Convert.ToInt32(productCategoryData.Rows[index]["TraceCount"]);
            Type = Convert.ToInt32(productCategoryData.Rows[index]["Type"]);
            Description = productCategoryData.Rows[index]["Description"].ToString();
            CategoryId = productCategoryData.Rows[index]["CategoryId"].ToString();
            SellerId = productCategoryData.Rows[index]["SellerId"].ToString();
            Shipping = Convert.ToInt32(productCategoryData.Rows[index]["Shipping"]);
            CreateDate = Convert.ToDateTime(productCategoryData.Rows[0]["CreateDate"]);
            ModifyDate = Convert.ToDateTime(productCategoryData.Rows[0]["ModifyDate"]);
        }
    }
}