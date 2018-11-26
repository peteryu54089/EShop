using EShop.Model;
using EShop.Service;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EShop.Models
{
    public class MemberModel
    {
        public IMemberService memberService = new MemberService();

        /// <summary>
        /// 會員ID
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// 會員姓名
        /// </summary>
        [MaxLength(60)]
        [DisplayName("姓名")]
        public string Name { get; set; }

        /// <summary>
        /// 會員帳號
        /// </summary>
        [MaxLength(15)]
        [DisplayName("帳號")]
        [Required(ErrorMessage = "此欄位必填")]
        public string Account { get; set; }

        /// <summary>
        /// 會員密碼
        /// </summary>
        [MaxLength(15)]
        [DisplayName("密碼")]
        [Required(ErrorMessage = "此欄位必填")]
        public string Password { get; set; }

        /// <summary>
        /// 會員電子郵件
        /// </summary>
        [MaxLength(60)]
        [DisplayName("電子郵件")]
        public string Email { get; set; }

        /// <summary>
        /// 會員電話
        /// </summary>
        [MaxLength(12)]
        [DisplayName("電話")]
        public string Phone { get; set; }

        /// <summary>
        /// 會員地址
        /// </summary>
        [MaxLength(400)]
        [DisplayName("地址")]
        public string Address { get; set; }

        /// <summary>
        /// 會員性別
        /// </summary>
        [DisplayName("性別")]
        public int Sex { get; set; }

        /// <summary>
        /// 會員生日
        /// </summary>
        [DisplayName("生日")]
        public DateTime? Birthday { get; set; }

        /// <summary>
        /// 會員權限
        /// </summary>
        public int Privilege { get; set; }

        /// <summary>
        /// 創建日期
        /// </summary>
        [DisplayName("創建日期")]
        public DateTime? CreateDate { get; set; }

        /// <summary>
        /// 修改日期
        /// </summary>
        [DisplayName("修改日期")]
        public DateTime? ModifyDate { get; set; }

        /// <summary>
        /// 會員登入
        /// </summary>
        public void SignIn()
        {
            Member member = memberService.GetMemberByAccountAndPassword(Account, Password);

            Id = member.Id;
            Name = member.Name;
            Account = member.Account;
            Password = member.Password;
            Email = member.Email;
            Phone = member.Phone;
            Address = member.Address;
            Sex = member.Sex;
            Birthday = member.Birthday;
            Privilege = member.Privilege;
            CreateDate = member.CreateDate;
            ModifyDate = member.ModifyDate;
        }
    }
}
