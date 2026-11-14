using backend.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Dtos
{
    public class ProjectDto
    {
        [Required(AllowEmptyStrings = false)]
        [StringLength(200)]
        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;

        [Required(AllowEmptyStrings = false)]
        [StringLength(400)]
        [JsonPropertyName("subtitle")]
        public string Subtitle { get; set; } = string.Empty;

        [Required(AllowEmptyStrings = false)]
        [StringLength(5000)]
        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("additionalData")]
        public List<ProjectAdditionalData> AdditionalData { get; set; } = [];
    }
}