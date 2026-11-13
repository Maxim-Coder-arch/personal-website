using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers.Articles
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ArticlesController : ControllerBase
    {
        private readonly ApplicationDBContext context;

        public ArticlesController(ApplicationDBContext context)
        {
            this.context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            List<Article> articles = await context.Articles
                                                    .AsNoTracking()
                                                    .OrderByDescending(a => a.CreatedAt)
                                                    .ToListAsync();

            return Ok(articles);
        }

        [HttpGet("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(Guid id)
        {
            Article? article = await context.Articles.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            return Ok(article);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ArticleDto model)
        {
            Article newArticle = new()
            {
                Title = model.Title,
                Subtitle = model.Subtitle,
                Text = model.Text,
                CreatedAt = DateTime.UtcNow
            };

            context.Articles.Add(newArticle);

            await context.SaveChangesAsync();

            return Ok(newArticle);
        }

        [HttpPut("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Change(Guid id, [FromBody] ArticleDto model)
        {
            Article? article = await context.Articles.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            article.Title = model.Title;
            article.Subtitle = model.Subtitle;
            article.Text = model.Text;

            await context.SaveChangesAsync();

            return Ok(article);
        }

        [HttpDelete("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid id)
        {
            Article? article = await context.Articles.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            context.Articles.Remove(article);

            await context.SaveChangesAsync();

            return Ok(article);
        }
    }
}