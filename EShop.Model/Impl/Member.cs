using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Model
{
    public class Member : IMember
    {
        public virtual string Id { get; set; }

        public virtual string Name { get; set; }

        public virtual string Account { get; set; }

        public virtual string Password { get; set; }

        public virtual string Email { get; set; }

        public virtual string Phone { get; set; }

        public virtual string Address { get; set; }

        public virtual int Sex { get; set; }

        public virtual DateTime Birthday { get; set; }

        public virtual int Privilege { get; set; }

        public virtual DateTime CreateDate { get; set; }

        public virtual DateTime ModifyDate { get; set; }

        public Member(DataTable memberData)
        {
            Id = memberData.Rows[0]["Id"].ToString();
            Name = memberData.Rows[0]["Name"].ToString();
            Account = memberData.Rows[0]["Account"].ToString();
            Password = memberData.Rows[0]["Password"].ToString();
            Email = memberData.Rows[0]["Email"].ToString();
            Phone = memberData.Rows[0]["Phone"].ToString();
            Address = memberData.Rows[0]["Address"].ToString();
            Sex = Convert.ToInt32(memberData.Rows[0]["Sex"]);
            Birthday = Convert.ToDateTime(memberData.Rows[0]["Birthday"]);
            Privilege = Convert.ToInt32(memberData.Rows[0]["Privilege"]);
            CreateDate = Convert.ToDateTime(memberData.Rows[0]["CreateDate"]);
            ModifyDate = Convert.ToDateTime(memberData.Rows[0]["ModifyDate"]);
        }
    }
}
