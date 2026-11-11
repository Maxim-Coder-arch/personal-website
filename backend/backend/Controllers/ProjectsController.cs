using backend.Data;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly ApplicationDBContext context;

        public ProjectsController(ApplicationDBContext context)
        {
            this.context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            List<ProjectResponseDto> response = await context.Projects
                .AsNoTracking()
                .Select(p => new ProjectResponseDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Subtitle = p.Subtitle,
                    Description = p.Description,
                    AdditionalData = p.AdditionalData
                })
                .ToListAsync();

            return Ok(response);
        }

        [HttpGet("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(Guid id)
        {
            Project? project = await context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(MapToResponse(project));
        } 

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProjectDto model)
        {
            Project project = new()
            {
                Title = model.Title,
                Subtitle = model.Subtitle,
                Description = model.Description,
                AdditionalData = model.AdditionalData
            };

            context.Projects.Add(project);

            await context.SaveChangesAsync();

            return Ok(project);
        }

        [HttpPut("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Change([FromBody] ProjectDto model, Guid id)
        {
            Project? project = await context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            project.Title = model.Title;
            project.Subtitle = model.Subtitle;
            project.Description = model.Description;
            project.AdditionalData = model.AdditionalData;

            await context.SaveChangesAsync();

            return Ok(project);
        }

        [HttpDelete("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid id)
        {
            Project? project = await context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            context.Projects.Remove(project);

            await context.SaveChangesAsync();

            return Ok(project);
        }

        [HttpPost("{id:guid}/image")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadImage(Guid id, IFormFile file)
        {
            Project? project = await context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            if (file == null || file.Length == 0)
            {
                return BadRequest("Image is required");
            }

            if (file.Length > 5 * 1024 * 1024)
            {
                return BadRequest("Image is too large");
            }

            string[] allowedTypes = ["image/jpeg", "image/png", "image/webp"];

            if (!allowedTypes.Contains(file.ContentType))
            {
                return BadRequest("Unsupported image format");
            }

            using MemoryStream memoryStream = new();

            await file.CopyToAsync(memoryStream);

            project.ImageData = memoryStream.ToArray();
            project.ImageContentType = file.ContentType;

            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("{id:guid}/image")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [AllowAnonymous]
        public async Task<IActionResult> GetImage(Guid id)
        {
            Project? project = await context.Projects.FindAsync(id);

            if (project == null || project.ImageData.Length == 0)
            {
                return NotFound();
            }

            return File(project.ImageData, project.ImageContentType);
        }

        [HttpPut("{id:guid}/image")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateImage(Guid id, IFormFile file)
        {
            Project? project = await context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            if (file == null || file.Length == 0)
            {
                return BadRequest("Image is required");
            }

            if (file.Length > 5 * 1024 * 1024)
            {
                return BadRequest("Image is too large");
            }

            string[] allowedTypes = ["image/jpeg", "image/png", "image/webp"];

            if (!allowedTypes.Contains(file.ContentType))
            {
                return BadRequest("Unsupported image format");
            }

            using MemoryStream memoryStream = new();

            await file.CopyToAsync(memoryStream);

            project.ImageData = memoryStream.ToArray();
            project.ImageContentType = file.ContentType;

            await context.SaveChangesAsync();

            return Ok();
        }

        private static ProjectResponseDto MapToResponse(Project project)
        {
            return new ProjectResponseDto
            {
                Id = project.Id,
                Title = project.Title,
                Subtitle = project.Subtitle,
                Description = project.Description,
                AdditionalData = project.AdditionalData,
            };
        }
    }
}