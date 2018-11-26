using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Model
{
    public interface IMember
    {
        string Id { get; set; }

        string Name { get; set; }

        string Account { get; set; }

        string Password { get; set; }

        string Email { get; set; }

        string Phone { get; set; }

        string Address { get; set; }

        int Sex { get; set; }

        DateTime Birthday { get; set; }

        int Privilege { get; set; }

        DateTime CreateDate { get; set; }

        DateTime ModifyDate { get; set; }
    }
}
