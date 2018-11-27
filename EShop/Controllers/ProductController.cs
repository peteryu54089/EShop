using EShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EShop.Controllers
{
    public class ProductController : Controller
    {
        /// <summary>
        /// 商品總覽
        /// </summary>
        /// <returns></returns>
        public ActionResult Index(string id)
        {
            ViewBag.CategoryId = id;
            return View(new ProductModel());
        }
    }
}
