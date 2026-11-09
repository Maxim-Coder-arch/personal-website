using backend.Models;
using System.Text.Json.Serialization;

namespace backend.Dtos
{
    public class ProjectDto
    {

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("subtitle")]
        public string Subtitle { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("additionalData")]
        public List<ProjectAdditionalData> AdditionalData { get; set; } = [];
    }
}
