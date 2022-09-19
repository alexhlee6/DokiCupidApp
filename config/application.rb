require_relative 'boot'

require 'rails/all'
# require "active_storage"
require "active_storage"

# config.middleware.insert_before 0, Rack::Cors do
#   allow do
#     origins '*' #have to change these later
#     resource '*', headers: :any, methods: %I[get post options] #have to change these later
#   end
# end

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module DokiCupid
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    redis_params = { url: ENV["REDIS_URL"] || 'redis://localhost:3000' }
    redis_params[:ssl_params] = { verify_mode: OpenSSL::SSL::VERIFY_NONE } 

    config.redis_params = redis_params
  end
end
