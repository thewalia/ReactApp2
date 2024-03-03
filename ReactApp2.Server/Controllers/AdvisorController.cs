﻿
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

using ReactApp2.Server.Models;
using ReactApp2.Server.Respository;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;

namespace ReactApp2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvisorController : ControllerBase
    {
        private readonly AdvisorDataAccess _dataAccess;

        public AdvisorController(AdvisorDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        

        [HttpGet("{id}")]
        public ActionResult<Advisor> GetAdvisor(int id)
        {
            // TODO: Implement this method
            return NotFound();
        }

       


    }
}