using EShop.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Service
{
    public interface IMemberService
    {
        /// <summary>
        /// 依照帳號密碼取得會員
        /// </summary>
        Member GetMemberByAccountAndPassword(string account, string password);
    }
}
