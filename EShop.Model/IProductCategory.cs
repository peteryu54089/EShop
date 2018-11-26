using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Model
{
    public interface IProductCategory
    {
        string Id { get; set; }

        string CategoryId { get; set; }

        string Name { get; set; }
    }
}
