using System.Text.Json.Serialization;

namespace backend.Models
{
    public class ProjectAdditionalData
    {
        [JsonPropertyName("label")]
        public string Label { get; set; }

        [JsonPropertyName("value")]
        public string Value { get; set; }
    }
}
