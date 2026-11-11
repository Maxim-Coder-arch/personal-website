using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Project
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("subtitle")]
        public string Subtitle { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("additionalData")]
        public List<ProjectAdditionalData> AdditionalData { get; set; } = [];
        [JsonIgnore]
        public byte[] ImageData { get; set; } = [];
        [JsonIgnore]
        public string ImageContentType { get; set; } = "image/webp";

        [JsonPropertyName("sortOrder")]
        public int SortOrder { get; set; }
    }
}