using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Model
{
    public interface IProduct
    {
        string Id { get; set; }

        string Name { get; set; }

        int UnitPrice { get; set; }

        int Quantity { get; set; }

        int Status { get; set; }

        int ClickCount { get; set; }

        int TraceCount { get; set; }

        int Type { get; set; }

        string Description { get; set; }

        string CategoryId { get; set; }

        string SellerId { get; set; }

        int Shipping { get; set; }

        DateTime CreateDate { get; set; }

        DateTime ModifyDate { get; set; }
    }
}
