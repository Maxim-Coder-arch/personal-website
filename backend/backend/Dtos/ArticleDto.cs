using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Dtos
{
    public class ArticleDto
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
        [JsonPropertyName("text")]
        public string Text { get; set; } = string.Empty;
    }
}