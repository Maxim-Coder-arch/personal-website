using backend.Models;
using System.Text.Json.Serialization;

namespace backend.Dtos
{
    public class ProjectResponseDto
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;

        [JsonPropertyName("subtitle")]
        public string Subtitle { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("additionalData")]
        public List<ProjectAdditionalData> AdditionalData { get; set; } = [];

        [JsonPropertyName("imagePath")]
        public string? ImagePath { get; set; }
    }
}