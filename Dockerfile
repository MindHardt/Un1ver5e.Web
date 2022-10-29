#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal-arm64v8 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0-focal-arm64v8 AS build
WORKDIR /src
COPY ["Un1ver5e.ru.csproj", "."]
RUN dotnet restore "./Un1ver5e.ru.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Un1ver5e.ru.csproj" -c Release -o /app/build -r linux-arm64

FROM build AS publish
RUN dotnet publish "Un1ver5e.ru.csproj" -c Release -o /app/publish -r linux-arm64

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Un1ver5e.ru.dll"]