using EShop.Dao;
using EShop.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Service
{
    public class MemberService : IMemberService
    {
        public IMemberDao MemberDao = new MemberDao();

        /// <summary>
        /// 依照帳號密碼取得會員
        /// </summary>
        public Member GetMemberByAccountAndPassword(string account, string password)
        {
            return MemberDao.GetMemberByAccountAndPassword(account, password);
        }
    }
}
