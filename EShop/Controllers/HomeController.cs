using EShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EShop.Controllers
{
    public class HomeController : Controller
    {
        /// <summary>
        /// 商品總覽
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View(new ProductCategoryModel());
        }

        /// <summary>
        /// 會員登入
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult SignIn(MemberModel member)
        {
            if (ModelState.IsValid)
            {
                member.SignIn();
            }
            return View("Index", member);
        }
    }
}
