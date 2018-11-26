using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Common
{
    public static class ConfigTool
    {
        /// <summary>
        /// 取得DB連線字串
        /// </summary>
        /// <returns></returns>
        public static string GetDBConnectionString(string connName)
        {
            return System.Configuration.ConfigurationManager.ConnectionStrings[connName].ConnectionString.ToString();
        }
    }
}
