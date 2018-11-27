using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Model
{
    public class ProductCategory : IProductCategory
    {
        public virtual string Id { get; set; }

        public virtual string CategoryId { get; set; }

        public virtual string Name { get; set; }

        public virtual string Image { get; set; }

        public ProductCategory(DataTable productCategoryData, int index)
        {
            Id = productCategoryData.Rows[index]["Id"].ToString();
            CategoryId = productCategoryData.Rows[index]["CategoryId"].ToString();
            Name = productCategoryData.Rows[index]["Name"].ToString();
            Image = productCategoryData.Rows[index]["Image"].ToString();
        }
    }
}
